import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

const AddCabin = () => {
  return (
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>

  );
};

// const AddCabin = () => {
//   const [isOpenModal, setIsOpenModel] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModel(() => !isOpenModal)}>
//         Add Cabins
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModel(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModel(false)}/>
//         </Modal>
//       )}
//     </div>
//   );
// };

export default AddCabin;
