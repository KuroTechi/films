import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import { maxYear, minYear } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { setYearsRange } from "../../store/filtersSlice";
export default function YearsSlider() {
  const dispatch = useDispatch();

  const yearsRange = useSelector((state) => state.filters.yearsRange);

  const handleChange = (event, newValue) => {
    dispatch(setYearsRange({ yearsRange: newValue }));
  };

  return (
    <>
      <Typography sx={{ padding: "16px", fontWeight: 700, fontSize: "16px" }}>
        Год релиза:
      </Typography>
      <Box sx={{ maxWidth: "300px", padding: "24px 16px 0px 16px" }}>
        <Slider
          value={yearsRange}
          onChange={handleChange}
          valueLabelDisplay="on"
          min={minYear}
          max={maxYear}
        />
      </Box>
    </>
  );
}

export { YearsSlider };
