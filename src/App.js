import "./App.css";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Typography, Switch, FormControlLabel, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function App() {
  const [data, setData] = useState([]);
  const [debugMode, setDebugMode] = useState(false);
  function toggleDebugMode() {
    setDebugMode(!debugMode);
  } 

  function getData() {
    axios
      .get("https://projectzerothree.info/prices/1658492231.json")
      .then(function (response) {
        if (debugMode) {console.log(response.data.regions);}
        setData(response.data.regions);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  let rows = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].region === "All") {
      for (let j = 0; j < data[i].prices.length; j++) {
        let currentData = data[i].prices[j];

        let entry = {
          type: currentData.type,
          id: j,
          name: currentData.name,
          postcode: currentData.postcode,
          price: currentData.price,
          state: currentData.state,
          suburb: currentData.suburb,
        };

        rows.push(entry);
      }
    }
  }

  const columns = [
    { flex: 1, field: "type", headerName: "Type" },
    { flex: 1, field: "name", headerName: "Name" },
    { flex: 1, field: "postcode", headerName: "Postcode" },
    { flex: 1, field: "price", headerName: "Price" },
    { flex: 1, field: "state", headerName: "State" },
    { flex: 1, field: "suburb", headerName: "Suburb" },
  ];

  return (
    <div className="App">
      <br />
      <Typography variant="h1" component="div">
        Elia's 7-11 App
      </Typography>
      <br />
      <Tooltip title="When enabled, the data is logged in console.">
      <FormControlLabel
        control={
            <Switch
              checked={debugMode}
              onChange={() => {toggleDebugMode()}}
              inputProps={{ 'aria-label': 'controlled' }}
            />
      }
      label="Toggle Debug Mode"
      />
      </Tooltip>
      <Button variant="contained" onClick={() => {getData()}}>Refresh Data</Button>

      <br/>
      <br/>

      <div style={{ display: "flex", height: "500px", width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>

    </div>
  );
}

export default App;
