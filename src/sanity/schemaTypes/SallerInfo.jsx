export default {
  name: "saller",
  title: "Saller",
  type: "document",
  fields: [
    {
      name: "title",
      title: "الاسم",
      type: "object",
      fields: [
        {
          name: "en",
          title: "الاسم بالانجليزي",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "ar",
          title: "الاسم بالعربي",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "phone",
      title: "رقم الهاتف",
      type: "string",
      validation: (Rule) => Rule.required().error("رقم الهاتف مطلوب"),
    },
    {
      name: "email",
      title: "البريد الإلكتروني",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .error("البريد الإلكتروني مطلوب")
          .email("يرجى إدخال بريد إلكتروني صالح"),
    },
  ],
};
