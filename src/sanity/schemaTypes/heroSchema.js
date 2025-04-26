export default {
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    {
      name: "headerTitle",
      title: "Header Title",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "ar",
          title: "Arabic",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "paragraph",
      title: "Paragraph",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "text",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "ar",
          title: "Arabic",
          type: "text",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "image",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
  ],
};
