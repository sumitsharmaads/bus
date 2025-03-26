import { ExpandLess, ExpandMore, FilterAlt } from "@mui/icons-material";
import {
  Box,
  Collapse,
  Container,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";

type TouristPlacesAdmintype = {
  title: string;
  image: string;
  shortDescription: string;
  city: string;
  state: string;
};

const TouristPlacesAdmin: React.FC = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  return (
    <Container maxWidth="lg">
      <Paper
        elevation={4}
        sx={{ padding: 4, mb: 4, borderRadius: 3, backgroundColor: "#fff" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <FilterAlt /> Filters
          </Typography>
          <IconButton onClick={() => setFilterVisible(!filterVisible)}>
            {filterVisible ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <Collapse in={filterVisible} timeout="auto" unmountOnExit></Collapse>
      </Paper>
    </Container>
  );
};

export default TouristPlacesAdmin;
