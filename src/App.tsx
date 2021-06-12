import {
  DefaultButton,
  initializeIcons,
  IStackTokens,
  Panel,
  PanelType,
  Stack,
  Link as FluentLink,
  FocusZoneDirection,
  FocusZone,
  setFocusVisibility,
} from "@fluentui/react";
import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { ResourceCardCompact } from "./CompactResouceCard";
import { IListingContact } from "./Models";
import { useBoolean } from "@fluentui/react-hooks";
import { FilterControls } from "./FilterControls";
import { CATEGORIES } from "./Utils";
import { DetailsPane } from "./DetailsPane";
import "./App.css";
import { TablePagination } from "@material-ui/core";

const stackTokens: IStackTokens = { childrenGap: 10 };

// Initialize icons in case this example uses them
initializeIcons();

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Search />
          </Route>
          <Route path="/details">
            <Details />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

const Search = withRouter((props: RouteComponentProps) => {
  const [paramStr, setParamString] = React.useState(props.location.search);
  const params = new URLSearchParams(paramStr);

  const cat = getCurrentCategory(params);
  const [category, setCategory] = React.useState(cat.category);
  const [type, setType] = React.useState(getCurrentType(params));
  const [subCategory, setSubCategory] = React.useState<string[]>(cat.options);

  const [resources, setResources] = useState<IListingContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const pagination = getPagination(params);

  const [page, setPage] = useState(pagination.page);
  const [rowCount, setRowCount] = useState(pagination.count);
  const [totalCount, setTotalCount] = useState(0);

  const [city, setCity] = React.useState<string[]>(getCity(params));

  const onHistoryChange = (location: {
    search: React.SetStateAction<string>;
  }) => {
    setParamString(location.search);
  };

  useEffect(() => {
    const removeListener = props.history.listen(onHistoryChange);
    const newParams = new URLSearchParams(paramStr);
    const searchUrl = formSearchUrl(newParams);

    fetch(searchUrl, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setResources(response.rows);
        setTotalCount(response.count);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));

    return () => {
      removeListener();
    };
  }, [paramStr, props.history]);

  const [isOpen, { setTrue: openFiltersPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  const setFilterCategory = (newCategory: string) => {
    if (newCategory === category) {
      return;
    }
    if (newCategory === "all") {
      CATEGORIES.forEach((cat) => {
        params.delete(cat);
      });
      updateParams(params.toString());
    }
    setCategory(newCategory);
  };

  const setFilterType = (newType: string) => {
    if (type === newType) {
      return;
    }
    params.delete("type");
    if (newType === "availability" || newType === "requirement") {
      params.append("type", newType);
      setURLPage(0);
    }
    updateParams(params.toString());
    setType(newType);
  };

  const setFilterSubcategory = (options: string[]) => {
    params.delete(category);
    options.forEach((opt) => params.append(category, opt));
    setURLPage(0);
    updateParams(params.toString());
    setSubCategory(options);
  };

  const setFilterCity = (city: string[]) => {
    params.delete("location");
    city.forEach((c) => params.append("location", c));
    setURLPage(0);
    updateParams(params.toString());
    setCity(city);
  };

  const setURLPage = (page: number) => {
    params.delete("page");
    if (page > 0) {
      params.append("page", page.toString());
    }
    setPage(page);
  };

  const updateParams = (newParamStr: string) => {
    props.history.push(`/?${newParamStr}`);
    setParamString(newParamStr);
  };

  setFocusVisibility(true);
  const [selectedIdx, setSelectedIdx] = useState(0);
  return (
    <Stack
      verticalAlign="center"
      verticalFill
      styles={{
        root: {
          margin: "0 20px",
        },
      }}
      tokens={stackTokens}
    >
      <div
        style={{
          margin: "15 0 0",
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        Covid Resources Search
      </div>
      <a
        target="_blank"
        rel="noreferrer"
        href={"https://api.whatsapp.com/send?phone=918882017983?text='Hi'"}
        style={{ margin: "5px 0", fontSize: 12 }}
      >
        Send leads to whatsapp +91-8882017983
      </a>
      <DefaultButton
        text="Open filters"
        onClick={openFiltersPanel}
        style={{ marginBottom: 10, maxWidth: 482 }}
      />
      <div style={{ display: "flex", margin: 0 }}>
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onChangePage={(e, pg) => {
            setURLPage(pg);
            updateParams(params.toString());
          }}
          rowsPerPage={rowCount}
          onChangeRowsPerPage={(e) => {
            const c = e.target.value;
            params.delete("count");
            params.append("count", c.toString());
            setRowCount(+c);
            updateParams(params.toString());
          }}
        />
      </div>
      <div>
        <Panel
          headerText="Filters"
          isOpen={isOpen}
          onDismiss={dismissPanel}
          isLightDismiss
          type={PanelType.medium}
          // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
          closeButtonAriaLabel="Close"
        >
          <FilterControls
            category={category}
            subCategory={subCategory}
            type={type}
            city={city}
            setCategory={setFilterCategory}
            setSubCategory={setFilterSubcategory}
            setType={setFilterType}
            setCity={setFilterCity}
          />
        </Panel>
      </div>
      {isLoading ? (
        <></>
      ) : (
        <FocusZone
          direction={FocusZoneDirection.vertical}
          isCircularNavigation={true}
          role="grid"
          defaultTabbableElement={"div.ms-DocumentCard:first-child"}
          shouldFocusOnMount={true}
          style={{ display: "flex", flexDirection: "row" }}
          onFocus={(ev) => {
            if (resources && resources.length > 0) {
              const clickResourceNode = ev.target.closest(".ms-DocumentCard");
              var nodes = Array.prototype.slice.call(
                clickResourceNode?.parentNode?.childNodes
              );
              setSelectedIdx(nodes.indexOf(clickResourceNode));
            }
          }}
        >
          <Stack
            tokens={stackTokens}
            wrap={true}
            styles={{ inner: { maxWidth: 500 } }}
          >
            {resources && resources.length ? (
              resources.map((r) => (
                <ResourceCardCompact resource={r} key={r.contactuid} />
              ))
            ) : (
              <p>
                {"No results to show yet, "}
                <FluentLink onClick={openFiltersPanel}>
                  {"try using different filters."}
                </FluentLink>
                <br />
                {"Meanwhile, we will work on getting more leads!"}"
              </p>
            )}
          </Stack>
          {resources && resources.length > 0 && (
            <div
              style={{
                position: "fixed",
                height: "calc(100vh - 60px)",
                left: 520,
                top: 80,
                width: "calc(100vw - 550px)",
              }}
            >
              <DetailsPane contact={resources[selectedIdx]} />
            </div>
          )}
        </FocusZone>
      )}
    </Stack>
  );
});

function Details() {
  return (
    <div>
      <h2>Details</h2>
    </div>
  );
}

function formSearchUrl(params: URLSearchParams): string {
  return `https://covidresourcesapi.azurewebsites.net/contacts?${params.toString()}`;
}

function getCurrentType(params: URLSearchParams): string {
  const types = params.getAll("type");
  if (!types || types.length === 0 || types.length === 2) {
    return "both";
  } else {
    return types[0];
  }
}

function getCurrentCategory(params: URLSearchParams): {
  category: string;
  options: string[];
} {
  for (const cat of CATEGORIES) {
    let paramValues = params.getAll(cat) || [];
    if (paramValues.length > 0) {
      return { category: cat, options: paramValues };
    }
  }
  return { category: "all", options: [] };
}

function getPagination(params: URLSearchParams): {
  page: number;
  count: number;
} {
  const page = +(params.get("page") || 0);
  const count = +(params.get("count") || 10);

  return { page, count };
}

function getCity(params: URLSearchParams): string[] {
  return params.getAll("location");
}
