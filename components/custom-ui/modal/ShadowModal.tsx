"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect } from "react";

interface ShadowModalProps {
  isFooterVisible?: boolean;
  footer?: React.ReactNode;
  body: React.ReactNode;
  isHeaderVisible?: boolean;
  header?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShadowModal(props: ShadowModalProps) {
  const {
    isFooterVisible = false,
    isOpen,
    onClose,
    footer,
    body,
    isHeaderVisible = false,
    header = "Modal Title",
  } = props;
  return (
    <>
      <Modal
        scrollBehavior="outside"
        size="2xl"
        backdrop="opaque"
        placement="center"
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          base: "shadow-xs shadow-[#7D7C7C] bg-[#121212] p-7",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {isHeaderVisible && (
                <ModalHeader className="flex flex-col text-center">
                  {header}
                </ModalHeader>
              )}
              <ModalBody>{body}</ModalBody>
              {isFooterVisible && <ModalFooter>{footer}</ModalFooter>}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
