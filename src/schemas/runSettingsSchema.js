// src/schemas/runSettingsSchema.js
import * as yup from 'yup';

export const runSettingsSchema = yup.object().shape({
  model: yup.string().required('Model selection is required.'),
  temperature: yup.number()
    .min(0, 'Temperature must be at least 0')
    .max(1, 'Temperature must be at most 1')
    .required('Temperature is required.'),
  structuredOutput: yup.boolean(),
  codeExecution: yup.boolean(),
  functionCalling: yup.boolean(),
  groundingWithGoogleSearch: yup.boolean(),
  // Add more fields for advanced settings if needed
});