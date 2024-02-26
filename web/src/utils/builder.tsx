import { Builder } from "@builder.io/react";
import { Component as BuilderComponent, Input } from "@builder.io/sdk";
import { StyleProps } from "@chakra-ui/react";
import React from "react";
import theme from "@/theme";

export const withBuilderProps = <P extends object>(Component: React.ComponentType<P>) => {
  // eslint-disable-next-line react/function-component-definition
  return (props: P & { attributes?: React.HTMLAttributes<HTMLElement> }) => {
    const { attributes } = props;
    return <Component {...attributes} {...props} />;
  };
};

export const registerWithNoWrapper = (component: any, options: BuilderComponent) => {
  Builder.registerComponent(withBuilderProps(component), { noWrap: true, ...options });
};

const spacingOptions = ["0", ...Object.keys(theme.space)];
const colorOptions = Object.keys(theme.colors);
const fontSizeOptions = Object.keys(theme.fontSizes);
const fontWeightOptions = Object.keys(theme.fontWeights);
const boxShadowOptions = Object.keys(theme.shadows);
const borderRadiusOptions = Object.keys(theme.radii);
const borderOptions = Object.keys(theme.borders);
const fontOptions = Object.keys(theme.fonts);

type InputWithoutName = Omit<Input, "name" | "defaultValue"> & {
  defaultValue: string;
};

type ChakraInputObject = Partial<Record<keyof StyleProps, InputWithoutName>>;

type ChakraInputs = {
  margins: ChakraInputObject;
  paddings: ChakraInputObject;
  borders: ChakraInputObject;
  typography: ChakraInputObject;
  misc: ChakraInputObject;
};

const chakraInputs: ChakraInputs = {
  margins: {
    mt: {
      friendlyName: "Top margin",
      type: "string",
      enum: spacingOptions,
      defaultValue: "0",
    },
    mb: {
      friendlyName: "Bottom margin",
      type: "string",
      enum: spacingOptions,
      defaultValue: "0",
    },
    ml: {
      friendlyName: "Left margin",
      type: "string",
      enum: spacingOptions,
      defaultValue: "0",
    },
    mr: {
      friendlyName: "Right margin",
      type: "string",
      enum: spacingOptions,
      defaultValue: "0",
    },
  },
  paddings: {
    pt: {
      friendlyName: "Top padding",
      type: "string",
      enum: spacingOptions,
      defaultValue: "0",
    },
    pb: {
      friendlyName: "Bottom padding",
      type: "string",
      enum: spacingOptions,
      defaultValue: "0",
    },
    pl: {
      friendlyName: "Left padding",
      type: "string",
      enum: spacingOptions,
      defaultValue: "0",
    },
    pr: {
      friendlyName: "Right padding",
      type: "string",
      enum: spacingOptions,
      defaultValue: "0",
    },
  },
  borders: {
    border: {
      friendlyName: "Border",
      type: "string",
      enum: borderOptions,
      defaultValue: "none",
    },
    borderColor: {
      friendlyName: "Border color",
      type: "string",
      defaultValue: "black",
      enum: colorOptions,
    },
    borderRadius: {
      friendlyName: "Border radius",
      type: "string",
      enum: borderRadiusOptions,
      defaultValue: "0",
    },
  },
  typography: {
    color: {
      friendlyName: "Text color",
      type: "string",
      enum: colorOptions,
      required: false,
      defaultValue: "black",
    },
    fontSize: {
      friendlyName: "Font size",
      type: "string",
      enum: fontSizeOptions,
      defaultValue: "md",
    },
    fontWeight: {
      friendlyName: "Font weight",
      type: "string",
      enum: fontWeightOptions,
      defaultValue: "normal",
    },
    fontFamily: {
      friendlyName: "Font family",
      type: "string",
      enum: fontOptions,
      defaultValue: "body",
    },
  },
  misc: {
    boxShadow: {
      friendlyName: "Box shadow",
      type: "string",
      enum: boxShadowOptions,
      defaultValue: "none",
    },
    bg: {
      friendlyName: "Background color",
      type: "string",
      enum: colorOptions,
      defaultValue: "white",
    },
  },
};

interface BuilderChakraProps extends React.ComponentProps<any> {
  chakraProps?: Record<keyof ChakraInputs, StyleProps>;
}

export const withChakraProps = <P extends BuilderChakraProps>(Component: React.ComponentType<any>) => {
  // eslint-disable-next-line react/function-component-definition
  return (props: P & { attributes?: Record<string, any> }) => {
    const { attributes, chakraProps, builderBlock: _, builderState: __, ...rest } = props;
    const mappedChakraProps = {
      ...chakraProps?.margins,
      ...chakraProps?.paddings,
      ...chakraProps?.borders,
      ...chakraProps?.typography,
      ...chakraProps?.misc,
    };

    const { key, ...attributesWithoutKey } = attributes || {};

    return <Component key={key} {...rest} {...attributesWithoutKey} {...mappedChakraProps} />;
  };
};

const mapChakraInputs = (inputs: ChakraInputs): Input[] => {
  return Object.keys(inputs).map((key) => {
    const inputObject = inputs[key as keyof ChakraInputs];
    return {
      name: key,
      type: "object",
      defaultValue: {
        ...Object.keys(inputObject).reduce((acc, subKey) => {
          const typedSubKey = subKey as keyof ChakraInputObject;
          acc[typedSubKey] = (inputObject[typedSubKey] as InputWithoutName).defaultValue;
          return acc;
        }, {} as Record<keyof ChakraInputObject, string>),
      },
      subFields: Object.keys(inputObject).map((subKey) => {
        const { defaultValue: _, ...subInputObject } = inputObject[subKey as keyof ChakraInputObject] as InputWithoutName;
        return {
          name: subKey,
          ...subInputObject,
        };
      }),
    };
  });
};

// const mapChakraDefaultValues = (inputs: ChakraInputs) => {
//   return Object.keys(inputs).reduce((acc, key) => {
//     const typedKey = key as keyof ChakraInputs;
//     const inputObject = inputs[typedKey];
//     acc[typedKey] = Object.keys(inputObject).reduce((subAcc, subKey) => {
//       const typedSubKey = subKey as keyof ChakraInputObject;
//       // eslint-disable-next-line no-param-reassign
//       subAcc[typedSubKey] = (inputObject[typedSubKey] as InputWithoutName).defaultValue;
//       return subAcc;
//     }, {} as Record<keyof ChakraInputObject, string>);
//     return acc;
//   }, {} as Record<keyof ChakraInputs, Record<keyof ChakraInputObject, string>>);
// };

export const withChakraOptions = (options: BuilderComponent): BuilderComponent => {
  return {
    ...options,
    noWrap: true,
    inputs: [
      ...(options.inputs || []),
      {
        name: "chakraProps",
        friendlyName: "Chakra styles",
        type: "object",
        advanced: true,
        defaultValue: {},
        subFields: mapChakraInputs(chakraInputs),
      },
    ],
  };
};

// export const registerWithChakraProps = (component: any, options: BuilderComponent) => {
//   Builder.registerComponent(withChakraProps(component), { noWrap: true, ...withChakraInputs(options) });
// };
