// UsersList.tsx
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Pagination,
  Grid,
  Box,
  SelectChangeEvent,
  Container,
  Collapse,
  Typography,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore, FilterAlt } from "@mui/icons-material";
import { post } from "../../service";

export interface User {
  _id: string;
  email: string;
  username: string;
  fullname: string;
  roleType: number;
  access: number;
}

const roleTypes = [
  { value: 0, label: "Admin" },
  { value: 1, label: "Normal User" },
  { value: 2, label: "Captain" },
];

interface Condition {
  isCount: boolean;
  items: number;
  page: number;
  search: {
    email?: string;
    fullname?: string;
    username?: string;
  };
  roleType?: number;
  access?: number;
}

const accessTypes = [
  { value: -1, label: "Frozen" },
  { value: 0, label: "Active" },
  { value: 1, label: "Awaiting email activation" },
  { value: 2, label: "Requires password reset" },
];

const AdminUserList: React.FC = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState({
    email: "",
    username: "",
    fullname: "",
    roleType: "",
    access: "",
  });
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchUsers = async () => {
    let condition: Condition = {
      isCount: true,
      items: 10,
      page,
      search: {},
    };
    if (filters.email) {
      condition.search = {
        ...condition.search,
        email: filters.email,
      };
    }
    if (filters.fullname) {
      condition.search = {
        ...condition.search,
        fullname: filters.fullname,
      };
    }
    if (filters.username) {
      condition.search = {
        ...condition.search,
        username: filters.username,
      };
    }
    if (filters.roleType) {
      condition = {
        ...condition,
        roleType: Number(filters.roleType),
      };
    }
    if (filters.access) {
      condition = {
        ...condition,
        access: Number(filters.access),
      };
    }
    const users = await post<{
      message: string;
      result: {
        count: number | null;
        users: User[];
      };
      status: number;
      success: boolean;
    }>("users/getAll", {
      ...condition,
    });
    if (users?.data?.result) {
      const { count, users: tempUser } = users.data.result;
      setTotalPages(Math.ceil((count || 0) / itemsPerPage));
      setUsers(tempUser);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleFilterChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const target = e.target as HTMLInputElement;
    setFilters({
      ...filters,
      [target.name]: target.value as string,
    });
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleFilterSelectChange = (e: SelectChangeEvent<string>) => {
    const target = e.target as HTMLInputElement;
    setFilters({
      ...filters,
      [target.name]: target.value as string,
    });
  };

  const handleClearFilter = () => {
    setPage(1);
    setFilters({
      email: "",
      username: "",
      fullname: "",
      roleType: "",
      access: "",
    });
  };
  return (
    <Container maxWidth="lg">
      <h2>Users List</h2>
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
        <Collapse in={filterVisible} timeout="auto" unmountOnExit>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Email"
                name="email"
                value={filters.email}
                onChange={handleFilterChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Username"
                name="username"
                value={filters.username}
                onChange={handleFilterChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Full Name"
                name="fullname"
                value={filters.fullname}
                onChange={handleFilterChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="roleType-label">Role Type</InputLabel>
                <Select
                  labelId="roleType-label"
                  name="roleType"
                  value={filters.roleType}
                  label="Role Type"
                  onChange={handleFilterSelectChange}
                  size="small"
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {roleTypes.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      {role.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="access-label">Access Type</InputLabel>
                <Select
                  labelId="access-label"
                  name="access"
                  value={filters.access}
                  label="Access Type"
                  onChange={handleFilterSelectChange}
                  size="small"
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {accessTypes.map((access) => (
                    <MenuItem key={access.value} value={access.value}>
                      {access.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="flex-end"
              spacing={2}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ marginRight: 2 }}
                onClick={() => fetchUsers()}
              >
                Search
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClearFilter}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </Collapse>
      </Paper>
      {/* <Grid container justifyContent="flex-end" className="mb-2">
        <Grid item>
          <Button variant="contained">Add User</Button>
        </Grid>
      </Grid> */}
      <TableContainer component={Paper}>
        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Role Type</TableCell>
              <TableCell>Access Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>
                  {roleTypes.find((r) => r.value === user.roleType)?.label ||
                    user.roleType}
                </TableCell>
                <TableCell>
                  {accessTypes.find((a) => a.value === user.access)?.label ||
                    user.access}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    component={Link}
                    to={`${user._id}/edit`}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ mt: 2 }}
        />
      </div>
    </Container>
  );
};

export default AdminUserList;
