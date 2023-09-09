import "./App.css";
import SearchBoxSelect from "./component/src/SearchBoxSelect";
import { Box } from "@mui/material";
import { SelectInput } from "react-searchable-select";

function App() {
  let array = [...Array(10)].map((a, index) => {
    return { value: index + 1, label: `value ${index + 1}` };
  });

  return (
    <Box sx={{ my: 10, width: "300px", ml: 5 }}>
      <SelectInput
        selectionList={array}
        search={true}
        placeholder={"Select value"}
      />
    </Box>
  );
}

export default App;
