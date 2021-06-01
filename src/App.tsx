import {
  DefaultButton,
  initializeIcons,
  IStackTokens,
  Panel,
  PanelType,
  Stack,
} from "@fluentui/react";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps,
} from "react-router-dom";
import { ResourceCardCompact } from "./CompactResouceCard";
import { IListingContact } from "./Models";
import { useBoolean } from "@fluentui/react-hooks";
import { FilterControls } from "./FilterControls";
import { CATEGORIES } from "./Utils";

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
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
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
    <div>
      <h2>More options coming soon, reach out to +91-8882017983</h2>
    </div>
  );
}

function Search(props: RouteComponentProps) {
  const [paramStr, setParamString] = React.useState(props.location.search);
  const params = new URLSearchParams(paramStr);

  const cat = getCurrentCategory(params);
  const [category, setCategory] = React.useState(cat.category);
  const [type, setType] = React.useState(getCurrentType(params));
  const [subCategory, setSubCategory] = React.useState<string[]>(cat.options);

  const [resources, setResources] = useState<IListingContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const onBack = () => {
    setParamString(window.location.search);
  };

  useEffect(() => {
    window.addEventListener("popstate", onBack);
    const newParams = new URLSearchParams(paramStr);
    const searchUrl = formSearchUrl(newParams);

    fetch(searchUrl, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setResources(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));

    return () => {
      window.removeEventListener("popstate", onBack);
    };
  }, [paramStr]);

  const [isOpen, { setTrue: openFiltersPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  const setFilterCategory = (newCategory: string) => {
    if (newCategory === "all") {
      CATEGORIES.forEach((cat) => {
        params.delete(cat);
      });
      updateParams(params.toString());
    }
    setCategory(newCategory);
  };

  const setFilterType = (newType: string) => {
    params.delete("type");
    if (newType === "availability" || newType === "requirement") {
      params.append("type", encodeURIComponent(newType));
    }
    updateParams(params.toString());
    setType(newType);
  };

  const setFilterSubcategory = (options: string[]) => {
    params.delete(category);
    options.forEach((opt) => params.append(category, encodeURIComponent(opt)));
    updateParams(params.toString());
    setSubCategory(options);
  };

  const updateParams = (newParamStr: string) => {
    window.history.pushState("", "Covid Resources Help", `/search?${newParamStr}`);
    setParamString(newParamStr);
  };

  return (
    <div>
      <h2>Search</h2>{" "}
      <DefaultButton
        text="Open filters"
        onClick={openFiltersPanel}
        style={{ marginBottom: 10 }}
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
        <Stack tokens={stackTokens}>
          {resources.map((r) => (
            <ResourceCardCompact resource={r} key={r.contactuid} />
          ))}
        </Stack>
      )}
    </div>
  );
}

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
