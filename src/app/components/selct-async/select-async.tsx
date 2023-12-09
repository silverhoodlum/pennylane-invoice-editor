// import {
//   FormLabel,
//   FormControl,
//   FormErrorMessage,
//   useTheme,
// } from '@chakra-ui/react'
// import { Control, Controller, FieldError } from 'react-hook-form'
// import { StylesConfig } from 'react-select'
// import OptionTypeBase from 'react-select'
// import ReactAsyncSelect, { AsyncProps } from 'react-select/async'

// interface ISelectProps {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   control: Control<any>
//   name: string
//   label?: string
//   error?: FieldError
//   onInputChange: (inputValue: string) => void
// }

// export const AsyncSelect = ({
//   name,
//   control,
//   onInputChange,
//   label,
//   error,
//   ...rest
// }: ISelectProps): JSX.Element => {
//   const theme = useTheme()

//   const customStyles: StylesConfig<
//     {
//       label: string
//       value: string
//     },
//     false
//   > = {
//     menu: (provided) => ({
//       ...provided,
//       borderRadius: theme.radii.md,
//       padding: 15,
//     }),
//     control: (provided) => ({
//       ...provided,
//       backgroundColor: theme.colors.gray[100],
//       borderRadius: theme.radii.md,
//       height: 48,
//       padding: '0 4px',
//     }),
//     dropdownIndicator: (provided) => ({
//       ...provided,
//       color: theme.colors.gray[700],
//     }),
//     indicatorSeparator: (provided) => ({
//       ...provided,
//       display: 'none',
//     }),
//     option: (provided, state: { isSelected: boolean }) => ({
//       ...provided,
//       borderRadius: theme.radii.md,
//       color: state.isSelected ? 'white' : theme.colors.gray[700],
//       padding: '10px 20px',
//       marginBottom: 4,
//       cursor: 'pointer',
//     }),
//   }

//   return (
//     <FormControl isInvalid={!!error}>
//       {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

//       <Controller
//         name={name}
//         control={control}
//         render={({ field: { onChange, onBlur } }) => (
//           <ReactAsyncSelect
//             cacheOptions
//             onChange={(e) => onChange(e?.value)}
//             onBlur={onBlur}
//             onInputChange={onInputChange}
//             loadOptions={onInputChange}
//             getOptionValue={(option) => option.value}
//             getOptionLabel={(option) => option.label}
//             styles={customStyles}
//             noOptionsMessage={({ inputValue }) =>
//               !inputValue ? 'Começe a digitar...' : 'Nenhum encontrado'
//             }
//             placeholder=""
//           />
//         )}
//         {...rest}
//       />

//       {!!error && (
//         <FormErrorMessage position="absolute">{error.message}</FormErrorMessage>
//       )}
//     </FormControl>
//   )
// }

export const something = 0
