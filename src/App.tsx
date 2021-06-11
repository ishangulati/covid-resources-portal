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
  Link,
  withRouter,
} from "react-router-dom";
import { ResourceCardCompact } from "./CompactResouceCard";
import { IListingContact } from "./Models";
import { useBoolean } from "@fluentui/react-hooks";
import { FilterControls } from "./FilterControls";
import { CATEGORIES } from "./Utils";
import { DetailsPane } from "./DetailsPane";
import "./App.css"

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
            <Home />
          </Route>
          <Route path="/search" component={Search}></Route>
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

function Home() {
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
      <p>
        More options coming soon, reach out to +91-8882017983. Till then you can{" "}
        <Link to="/search">Search for Covid Resources</Link>
      </p>
    </Stack>
  );
}

const Search = withRouter((props: RouteComponentProps) => {
  const [paramStr, setParamString] = React.useState(props.location.search);
  const params = new URLSearchParams(paramStr);

  const cat = getCurrentCategory(params);
  const [category, setCategory] = React.useState(cat.category);
  const [type, setType] = React.useState(getCurrentType(params));
  const [subCategory, setSubCategory] = React.useState<string[]>(cat.options);

  const [resources, setResources] = useState<IListingContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    }
    updateParams(params.toString());
    setType(newType);
  };

  const setFilterSubcategory = (options: string[]) => {
    params.delete(category);
    options.forEach((opt) => params.append(category, opt));
    updateParams(params.toString());
    setSubCategory(options);
  };

  const updateParams = (newParamStr: string) => {
    props.history.push(`/search?${newParamStr}`);
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
      <h2>Search</h2>
      <DefaultButton
        text="Open filters"
        onClick={openFiltersPanel}
        style={{ marginBottom: 10, maxWidth: 482 }}
      />
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
            setCategory={setFilterCategory}
            setSubCategory={setFilterSubcategory}
            setType={setFilterType}
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
            styles={{ inner: { width: 500 } }}
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
            <DetailsPane contact={resources[selectedIdx]} />
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
