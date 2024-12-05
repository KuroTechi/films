import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGenres } from "../../store/filtersSlice";
import { getGenresForSelectMUI } from "../../store/utilsSlice";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function GenresSelect() {
  const dispatch = useDispatch();
  const selectedGenres = useSelector((state) => state.filters.genres);
  const selectOptions = useSelector(
    (state) => state.utils.genresForSelect.genres?.genres
  );

  useEffect(() => {
    dispatch(getGenresForSelectMUI());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    dispatch(setGenres({ genres: newValue }));
  };
  return (
    <Autocomplete
      sx={{ padding: "16px" }}
      multiple
      options={selectOptions ? selectOptions : []}
      value={selectedGenres}
      onChange={handleChange}
      disableCloseOnSelect
      limitTags={2}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        );
      }}
      style={{ maxWidth: "300px" }}
      renderInput={(params) => (
        <TextField variant="standard" {...params} label="Жанры" />
      )}
    />
  );
}

export { GenresSelect };
