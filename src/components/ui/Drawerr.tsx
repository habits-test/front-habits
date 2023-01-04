import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

type DrawerrProps = {
  drawerOpen: boolean;
  setDrawerOpen: (s: boolean) => void;
  ButtonDrawer: () => JSX.Element;
  BodyDrawer: () => JSX.Element;
};

export default function Drawerr({
  drawerOpen,
  setDrawerOpen,
  ButtonDrawer,
  BodyDrawer,
}: DrawerrProps) {
  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerOpen(!drawerOpen);
    };

  return (
    <div>
      <ButtonDrawer />

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer()}>
        <Box
          sx={{ width: 350 }}
          role="presentation"
          // onClick={toggleDrawer()}
          // onKeyDown={toggleDrawer()}
        >
          {BodyDrawer()}
        </Box>
      </Drawer>
    </div>
  );
}
