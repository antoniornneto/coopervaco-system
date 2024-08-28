export default function PortalUserDetail({
  params,
}: {
  params: { id: String };
}) {
  return <div>{params.id}</div>;
}
