import CView from "./primitives/CView";

export default function LandingComponent({ bottomChildren, topChildren }: { bottomChildren?: JSX.Element; topChildren?: JSX.Element }) {
  return (
    <CView style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
      <CView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          borderBottomLeftRadius: 100,
          backgroundColor: "green",
          width: "100%",
        }}
      >
        {topChildren}
      </CView>
      <CView style={{ flex: 1, alignItems: "center", width: "100%", justifyContent: "center", gap: 10, backgroundColor: "white" }}>
        <CView style={{ position: "absolute", top: 0, right: 0, width: 100, height: 100, backgroundColor: "green" }} />
        <CView style={{ position: "absolute", top: 0, right: 0, width: 100, height: 100, backgroundColor: "white", borderTopRightRadius: 100 }} />
        {bottomChildren}
      </CView>
    </CView>
  );
}