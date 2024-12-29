import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export const errorPopup = (message: string) => {
  Swal.fire({
    title: message,
    text: "",
    icon: "error",
    showConfirmButton: true,
    timer: 5000, // Timeout duration in milliseconds
    timerProgressBar: true,
  });
};

export const successPopup = (message: string) => {
  Swal.fire({
    title: message,
    text: "",
    icon: "success",
    showConfirmButton: true,
    timer: 5000, // Timeout duration in milliseconds
    timerProgressBar: true,
  });
};
