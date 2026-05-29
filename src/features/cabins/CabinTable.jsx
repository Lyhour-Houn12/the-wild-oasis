import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const CabinTable = () => {
  const { isPending, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;
  if (!cabins.length) return <Empty resource='cabins' />;
  const filterValue = searchParams.get("discount") || "all";

  // 1). SORT
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2). SORT
  const sortedBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortedBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabin = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier,
  );
  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header as='header'>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={sortedCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
        {/* {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
        ))} */}
      </Table>
    </Menus>
  );
};

export default CabinTable;
