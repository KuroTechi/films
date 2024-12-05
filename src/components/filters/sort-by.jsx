import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { sortByValues } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { setSortBy } from "../../store/filtersSlice";

export default function SortBy() {
  const dispatch1 = useDispatch();

  const sortBy = useSelector((state) => state.filters.sortBy);

  const handleChange = (event) => {
    const value = event.target.value;
    dispatch1(setSortBy({ sortBy: value }));
  };
  return (
    <Box sx={{ minWidth: 120, padding: "16px" }}>
      <FormControl variant="standard" fullWidth>
        <InputLabel shrink>Сортировать по</InputLabel>
        <Select value={sortBy} label="Age" onChange={handleChange}>
          {sortByValues.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export { SortBy };
