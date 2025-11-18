import { useState } from "react";

export const useVehicleForm = ({ onAddVehicle, onRemoveVehicle, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    vehicle_type: "carro",
    license_plate: "",
    owner_name: "",
    phone: "",
    status: "En parqueadero",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!formData.license_plate) e.license_plate = "La placa es obligatoria";
    if (!formData.vehicle_type) e.vehicle_type = "El tipo es obligatorio";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVehicle = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const payload = {
        license_plate: formData.license_plate.trim().toUpperCase(),
        vehicle_type: formData.vehicle_type,
        owner_name: formData.owner_name || null,
        phone: formData.phone || null,
        status: formData.status || "En parqueadero",
      };

      const res = await onAddVehicle(payload);
      if (res?.success) {
        onSuccess && onSuccess(res);
        clearForm();
      } else {
        onError && onError(res?.message || "No se pudo registrar la entrada");
      }
    } catch (err) {
      const backendMessage =
        err?.response?.data?.detail ||
        err?.message ||
        "Error al registrar la entrada";
      onError && onError(backendMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveVehicle = async () => {
    if (!formData.license_plate) {
      setErrors({ license_plate: "La placa es obligatoria para la salida" });
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await onRemoveVehicle(formData.license_plate.trim().toUpperCase());
      if (res?.success) {
        onSuccess && onSuccess(res);
        clearForm();
      } else {
        onError && onError(res?.message || "No se pudo registrar la salida");
      }
    } catch (err) {
      onError && onError("Error al registrar la salida");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setFormData({
      vehicle_type: "carro",
      license_plate: "",
      owner_name: "",
      phone: "",
      status: "En parqueadero",
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleAddVehicle,
    handleRemoveVehicle,
    clearForm,
  };
};
