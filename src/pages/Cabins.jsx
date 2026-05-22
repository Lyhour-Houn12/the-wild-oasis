import Heading from "../ui/Heading";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Row from "../ui/Row";
import Button from "../ui/Button";

import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Filtering && Sorting</p>
      </Row>

      <Row type='vertical'>
        <CabinTable />

        <Button onClick={() => setShowForm(() => !showForm)}>Add Cabins</Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
