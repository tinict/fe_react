"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { GetCategories } from "@/common/api/form/categories.get";
import { PostCategories } from "@/common/api/form/categories.post";
import { PostQuestions } from "@/common/api/form/questions.post";
import { deleteCategory } from "@/common/api/form/category.delete";
import { FcDocument } from "react-icons/fc";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaChartArea } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { Image } from "@nextui-org/image";
import { noForms } from "@/utils/medias";
import toast, { Toaster } from "react-hot-toast";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import { MdOutlineSortByAlpha } from "react-icons/md";
import { RiLayoutGrid2Fill } from "react-icons/ri";
import { IoFolderOpen } from "react-icons/io5";

interface Category {
  id: string;
  name: string;
};

export default function Page() {
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [idDeleteCate, setIdDeleteCate] = useState<string>('');
  const router = useRouter();
  let genUUIDV4 = uuidv4();

  const fetchCreateQuestion = async (question: any) => {
    await PostQuestions(question);
  };

  const handleSaveFormQuiz = async (id: string) => {
    await PostCategories({
      id,
      name: "Quiz form without title",
    });

    await fetchCreateQuestion({
      id: genUUIDV4,
      name: "Quiz form without title",
      type: "multiple-choice",
      category_id: id,
      results: [],
      explain: ""
    });
  };

  const fetchGetCategories = async () => {
    const data = await GetCategories();

    if (data) {
      console.log(data?.props?.repo);
      setCategories(data?.props?.repo?.data);
    }
  };

  useEffect(() => {
    fetchGetCategories();
  }, []);

  const handelOpenModal = (idCate: string) => {
    setIdDeleteCate(idCate);
    onOpen();
  };

  const handleCreateQuizForm = async (id: string) => {
    try {
      await handleSaveFormQuiz(id);
      toast.success('Form Created Successfully!');
      await redirectEdit(id);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      toast.error("Form Creation Failed!");
    }
  };


  const handleDeleteCategory = async () => {
    await deleteCategory(idDeleteCate)
      .then(() => {
        setCategories(
          categories.filter((category: Category) => {
            return category.id !== idDeleteCate;
          }),
        );
        toast.success("Move on trash successfully!");
      })
      .catch(() => {
        toast.error("Move on trash failed!");
      })
  };

  const redirectEdit = async (id: string) => {
    router.push(`/forms/q/${id}/edit`);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section className="2xl:container mb-4">
      <div className="grid grid-cols-2 mt-4">
        <div>
          <h2 className="text-lg font-semibold text-[#2c31cf]">
            Start a new form
          </h2>
        </div>
        <div className="flex items-center justify-end">
          <button className="cursor-pointer" onClick={() => handleCreateQuizForm(genUUIDV4)}>
            <IoIosAddCircle className="text-[#2c31cf] h-[30px] w-[30px]" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 mb-4 mt-2">
        <p className="text-sm text-[#943ab8]">
          Explore forms by clicking on any card to get started:
        </p>
      </div>
      <div className="grid grid-cols-2 py-4">
        <div>
          <h3 className="text-md font-semibold text-[#2c31cf]">Recent forms</h3>
        </div>
        <div className="grid grid-cols-1">
          <div className="flex gap-3 items-center justify-end">
            <MdOutlineSortByAlpha className="text-[#2c31cf] cursor-pointer h-[20px] w-[20px]" />
            <RiLayoutGrid2Fill className="text-[#2c31cf] cursor-pointer h-[20px] w-[20px]" />
            <IoFolderOpen className="text-[#2c31cf] cursor-pointer h-[20px] w-[20px]" />
          </div>
        </div>
      </div>
      <div className="grid 2xl:grid-cols-10 xl:grid-cols-10 lg:grid-cols-8 md:grid-cols-7 sm:grid-cols-5 grid-cols-2 gap-4">
        {categories?.map((category: any, index: number) => (
          <div
            key={index}
            className="cursor-pointer group relative"
          >
            <div className="shadow-[rgba(0,0,0,0.16)_0px_1px_4px] grid grid-cols-1 p-2 gap-4">
              <div className="flex items-center justify-center">
                <FcDocument className="w-[80px] h-[80px]" />
              </div>
              <div className="grid grid-cols-3 gap-2 justify-center items-center">
                <CiEdit
                  className="text-blue-700 text-lg cursor-pointer h-[20px] w-[20px]"
                  onClick={() => redirectEdit(category?.id)}
                />
                <FaChartArea
                  className="text-blue-700 text-lg cursor-pointer h-[20px] w-[20px]"
                />
                <MdDeleteOutline
                  className="text-blue-700 text-lg cursor-pointer h-[20px] w-[20px]"
                  onClick={() => handelOpenModal(category?.id)}
                />
              </div>
            </div>
            <div className="mt-2">
              <p className="text-[14px] text-gray-400">{category?.name}</p>
            </div>
          </div>
        ))}
      </div>
      {
        categories.length == 0 && (
          <div className="flex justify-center items-center flex-col">
            <Image
              width={250}
              height={250}
              alt="NextUI hero Image with delay"
              radius="md"
              src={noForms.src}
            />
            <p className="text-base">There is no forms</p>
          </div>
        )
      }
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Move form to trash?</ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this form?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose} onClick={handleDeleteCategory}>
                  Move to trash
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="grid grid-cols-2 py-4">
        <div>
          <h3 className="text-md font-semibold text-[#2c31cf]">Template store</h3>
        </div>
        <div className="grid grid-cols-1">
          <div className="flex gap-3 items-center justify-end">
            <MdOutlineSortByAlpha className="text-[#2c31cf] cursor-pointer h-[22px] w-[22px]" />
            <RiLayoutGrid2Fill className="text-[#2c31cf] cursor-pointer h-[22px] w-[22px]" />
            <IoFolderOpen className="text-[#2c31cf] cursor-pointer h-[22px] w-[22px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
