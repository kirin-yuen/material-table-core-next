export default function Tab(theme) {
  return {
    MuiTab: {
      styleOverrides: {
        root: (props) => ({
          textTransform: 'initial',
        }),
      },
    },
  };
}
