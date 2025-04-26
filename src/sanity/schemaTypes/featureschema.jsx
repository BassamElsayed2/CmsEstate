export default {
  name: "featuresSection",
  title: "features",
  type: "document",
  fields: [
    {
      name: "features",
      title: "الكروت",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "ايكون",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "title",
              title: "Header",
              type: "object",
              fields: [
                {
                  name: "en",
                  title: "English",
                  type: "string",
                  validation: (Rule) => Rule.required().max(100),
                },
                {
                  name: "ar",
                  title: "Arabic",
                  type: "string",
                  validation: (Rule) => Rule.required().max(100),
                },
              ],
            },
            {
              name: "paragraph",
              title: "paragraph",
              type: "object",
              fields: [
                {
                  name: "en",
                  title: "English",
                  type: "text",
                  rows: 3,
                  validation: (Rule) => Rule.required().max(300),
                },
                {
                  name: "ar",
                  title: "Arabic",
                  type: "text",
                  rows: 3,
                  validation: (Rule) => Rule.required().max(300),
                },
              ],
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(4),
    },
  ],
};
