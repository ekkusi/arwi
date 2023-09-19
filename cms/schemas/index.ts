import { defineField, defineType, Rule, SchemaValidationValue } from "sanity";

const requiredOptions: {
  validation: SchemaValidationValue;
} = {
  validation: (rule: Rule) => rule.required(),
};

const formatTranslationField = (title: string, name: string, required: boolean = true) =>
  defineField({
    name,
    title,
    type: "object",
    validation: required ? (rule) => rule.required() : undefined,
    // @ts-ignore
    codegen: { required },
    fieldsets: [
      {
        title: "Käännökset",
        name: "translations",
        options: {
          collapsible: true,
          collapsed: true,
        },
      },
    ],
    fields: [
      {
        title: "Suomi",
        name: "fi",
        type: "string",
        validation: (rule) => rule.required().min(3),
      },
      {
        title: "Englanti",
        name: "en",
        type: "string",
        fieldset: "translations",
      },
      {
        title: "Ruotsi",
        name: "se",
        type: "string",
        fieldset: "translations",
      },
    ],
  });

const codeField = defineField({
  title: "Koodi",
  name: "code",
  type: "string",
  readOnly: ({ currentUser }) => !currentUser?.roles?.find((it) => it.name === "administrator"),
  placeholder: "Generoituu automaattisesti tallentaessa",
});

const learningObjectivesField = defineField({
  title: "Oppimistavoite",
  name: "learningObjective",
  type: "object",
  fields: [
    {
      title: "Koodi",
      name: "code",
      type: "string",
      validation: (rule) => rule.required().uppercase(),
      description:
        "HUOM! Koodia ei kuuluisi muokata ensimmäisen julkaisun jälkeen, sillä koodit ovat käytössä applikaation tietokannassa. Muokkaa koodeja vain, jos olet varma siitä mitä teet.",
    },
    {
      title: "Tyyppi",
      name: "type",
      type: "string",
      initialValue: "SKILLS_AND_BEHAVIOUR",
      ...requiredOptions,
      options: {
        list: [
          {
            title: "Osaaminen ja työskentely",
            value: "SKILLS_AND_BEHAVIOUR",
          },
          {
            title: "Osaaminen",
            value: "SKILLS",
          },
          {
            title: "Työskentely",
            value: "BEHAVIOUR",
          },
          {
            title: "Ei arvioitava",
            value: "BEHAVIOUR",
          },
        ],
      },
    },
    formatTranslationField("Lyhyt kuvaus", "label"),
    formatTranslationField("Pitkä kuvaus", "longDescription"),
  ],
  preview: {
    select: {
      code: "code",
      label: "label.fi",
    },
    prepare({ code, label }) {
      return {
        title: `${code}: ${label}`,
      };
    },
  },
});

const learningObjectiveCautionMessage =
  "HUOM! Oppimistavoitteiden poistamista tulee välttää ensimmäisen julkaisun jälkeen, sillä niiden koodit voivat olla käytössä applikaation tietokannassa. Oppimistavoitteiden poistaminen voi aiheuttaa ongelmia applikaation toiminnassa. Oppimistavoitteiden lisääminen on kuitenkin mahdollista riskittömästi.";

const courseCautionMessage =
  "HUOM! Kurssien ja moduulien poistamista tulee välttää ensimmäisen julkaisun jälkeen, sillä niiden koodit voivat olla käytössä applikaation tietokannassa. Kurssien poistaminen voi aiheuttaa ongelmia applikaation toiminnassa. Kurssien lisääminen on kuitenkin mahdollista riskittömästi.";

export const schemaTypes = [
  defineType({
    title: "Aineet",
    name: "subject",
    type: "document",
    groups: [
      {
        title: "Ympäristöt",
        name: "environments",
      },
      {
        title: "Peruskoulun oppimistavoitteet",
        name: "elementarySchool",
      },
      {
        title: "Lukion oppimistavoitteet",
        name: "highSchool",
      },
      {
        title: "Ammattikoulun oppimistavoitteet",
        name: "vocationalSchool",
      },
    ],
    fields: [
      formatTranslationField("Nimi", "name"),
      {
        title: "Koodi",
        name: "code",
        type: "string",
        validation: (rule) => rule.required(),
        readOnly: ({ currentUser }) => !currentUser?.roles?.find((it) => it.name === "administrator"),
      },
      {
        title: "Ympäristöt",
        name: "environments",
        type: "array",
        group: "environments",
        options: {
          sortable: false,
        },
        description:
          "HUOM! Ympäristöjen poistamista tulee välttää ensimmäisen julkaisun jälkeen, sillä niiden koodit voivat olla käytössä applikaation tietokannassa. Ympäristöjen poistaminen voi aiheuttaa ongelmia applikaation toiminnassa. Ympäristöjen lisääminen on kuitenkin mahdollista riskittömästi.",
        of: [
          {
            title: "Ympäristö",
            name: "environment",
            type: "object",
            ...requiredOptions,
            fields: [
              formatTranslationField("Nimi", "name"),
              codeField,
              {
                title: "Väri",
                name: "color",
                type: "color",
                ...requiredOptions,
              },
            ],
            preview: {
              select: {
                title: "name.fi",
              },
            },
          },
        ],
      },
      {
        title: "Peruskoulun oppimistavoitteet",
        name: "elementarySchool",
        type: "object",
        group: "elementarySchool",
        description: learningObjectiveCautionMessage,
        fields: [
          {
            title: "1-2 vuosiluokat",
            name: "one_to_two_years",
            type: "array",
            options: {
              sortable: false,
            },
            of: [learningObjectivesField],
          },
          {
            title: "3-6 vuosiluokat",
            name: "three_to_six_years",
            type: "array",
            options: {
              sortable: false,
            },
            of: [learningObjectivesField],
          },
          {
            title: "7-9 vuosiluokat",
            name: "seven_to_nine_years",
            type: "array",
            options: {
              sortable: false,
            },
            of: [learningObjectivesField],
          },
        ],
      },
      {
        title: "Lukion oppimistavoitteet",
        name: "highSchoolModules",
        type: "array",
        group: "highSchool",
        options: {
          sortable: false,
        },
        description: courseCautionMessage,
        of: [
          {
            title: "Moduuli",
            name: "learningObjectiveGroup",
            type: "object",
            fields: [
              formatTranslationField("Moduulin nimi", "name"),
              codeField,
              {
                title: "Oppimistavoitteet",
                name: "learningObjectives",
                type: "array",
                description: learningObjectiveCautionMessage,
                of: [learningObjectivesField],
                options: {
                  sortable: false,
                },
              },
            ],
            preview: {
              select: {
                title: "name.fi",
              },
            },
          },
        ],
      },
      {
        title: "Ammattikoulun oppimistavoitteet",
        name: "vocationalSchoolModules",
        type: "array",
        group: "vocationalSchool",
        description: courseCautionMessage,
        options: {
          sortable: false,
        },
        of: [
          {
            title: "Kurssi",
            name: "learningObjectiveGroup",
            type: "object",
            fields: [
              formatTranslationField("Kurssin nimi", "name"),
              codeField,
              {
                title: "Oppimistavoitteet",
                name: "learningObjectives",
                type: "array",
                of: [learningObjectivesField],
                description: learningObjectiveCautionMessage,
                options: {
                  sortable: false,
                },
              },
            ],
            preview: {
              select: {
                title: "name.fi",
              },
            },
          },
        ],
      },
    ],
    preview: {
      select: {
        title: "name.fi",
      },
    },
  }),
];
