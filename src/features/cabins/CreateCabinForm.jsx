import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();

  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;
  function onSubmitData(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    const processedData = {
      ...data,
      image,
      regularPrice: Number(data.regularPrice),
      discount: Number(data.discount),
      maxCapacity: Number(data.maxCapacity),
    };
    if (isEditSession) {
      editCabin(
        {
          newCabinData: { ...processedData, image },
          id: editId,
        },
        {
          onSuccess: (data) => {
            reset(data);
            onCloseModal?.();
          },
        },
      );
    } else {
      createCabin(
        { ...processedData, image },
        {
          onSuccess: (data) => {
            reset(data);
            onCloseModal?.();
          },
        },
      );
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmitData)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type='text'
          id='name'
          {...register("name", {
            required: "This field is required.",
            minLength: {
              value: 1,
              message: "Cabin name must be at least 1 character.",
            },
            maxLength: {
              value: 50,
              message: "Cabin name should be no more than 50 characters.",
            },
          })}
        />
      </FormRow>
      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type='number'
          id='maxCapacity'
          {...register("maxCapacity", {
            required: "This field is required.",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>
      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type='number'
          id='regularPrice'
          {...register("regularPrice", {
            required: "This field is required.",
            validate: (value) =>
              value > 0 || "Regular price should greater than 0",
          })}
        />
      </FormRow>
      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          type='number'
          id='discount'
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be lower than regular price or could be equal.",
          })}
        />
      </FormRow>
      <FormRow label='Description for website'>
        <Textarea
          type='text'
          id='description'
          defaultValue=''
          {...register("description")}
        />
      </FormRow>
      <FormRow label='Cabin photo'>
        <FileInput
          id='image'
          accept='image/*'
          {...register("image", {
            required: isEditSession ? false : "This field is required.",
          })}
        />
      </FormRow>
      <FormRow>
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
