import ClientLayoutStructure from "./LayoutStructureClient";

export default async function LayoutStructure({ children, userAuth }) {
  return (
    <ClientLayoutStructure userData={userAuth}>
      {children}
    </ClientLayoutStructure>
  );
}
