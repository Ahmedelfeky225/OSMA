// import { useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Divider from "@mui/material/Divider";
// import ListItemText from "@mui/material/ListItemText";
// import Logout from "@mui/icons-material/Logout";

// export default function UserMenu({ user, onLogout }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <Avatar
//         src={user?.image || ""}
//         alt={user?.name || "User"}
//         sx={{ cursor: "pointer", bgcolor: "#11cad3" }}
//         onClick={handleClick}
//       />
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           elevation: 2,
//           sx: { width: 240, borderRadius: 2 },
//           px: 2,
//         }}
//       >
//         <MenuItem>
//           <ListItemText>{user?.email || "User Email"}</ListItemText>
//         </MenuItem>
//         <Divider />
//         <MenuItem
//           onClick={() => {
//             handleClose();
//             onLogout();
//           }}
//           sx={{
//             color: "red",
//             fontWeight: "normal",
//             "& svg": { color: "red" },
//             "&:hover": {
//               backgroundColor: "#ffe6e6",
//             },
//           }}
//         >
//           <Logout fontSize="small" />
//           <span style={{ marginLeft: 8 }}>Logout</span>
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Logout from "@mui/icons-material/Logout";

export default function UserMenu({ user, onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Avatar
        src={user?.image || ""}
        alt={user?.name || "User"}
        sx={{ cursor: "pointer", bgcolor: "var(--primary-color)" }}
        onClick={handleClick}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 2,
          sx: { width: 240, borderRadius: 2 },
          px: 2,
        }}
      >
        <MenuItem>
          <ListItemText>{user?.email || "User Email"}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            onLogout();
          }}
          sx={{
            color: "red",
            fontWeight: "normal",
            "& svg": { color: "red" },
            "&:hover": {
              backgroundColor: "#ffe6e6",
            },
          }}
        >
          <Logout fontSize="small" />
          <span style={{ marginLeft: 8 }}>Logout</span>
        </MenuItem>
      </Menu>
    </>
  );
}
