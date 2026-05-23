import { useState } from 'react';

export function useFormFields<T extends Record<string, string | boolean>>(
  initialFields: T,
) {
  const [fields, setFields] = useState<T>(initialFields);

  const handleChange = (field: keyof T) => (value: string | boolean) =>
    setFields((prev) => ({ ...prev, [field]: value }));

  const resetFields = () => setFields(initialFields);

  return { fields, handleChange, resetFields };
}
