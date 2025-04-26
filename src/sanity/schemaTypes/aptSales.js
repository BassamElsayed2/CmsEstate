import { defineType, defineField } from "sanity";

export default defineType({
  name: "apartmentUnit",
  title: "Apartment Unit",
  type: "document",
  fields: [
    defineField({
      name: "mainImage",
      title: "الصورة الرئيسية",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "صور جانبية",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "price",
      title: "السعر",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "fees",
      title: "مقدم",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "location",
      title: "الموقع",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ar", title: "Arabic", type: "string" },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bedrooms",
      title: "عدد غرف النوم",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "bathrooms",
      title: "عدد الحمامات",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "area",
      title: "المساحة (م²)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "site",
      title: "الموقع",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc) => doc.location?.en || "apartment",
        slugify: (input) => {
          const randomNum = Math.floor(1000 + Math.random() * 9000);
          return `${input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")}-${randomNum}`.slice(0, 90);
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    {
      name: "saller",
      title: "البائع",
      type: "reference",
      to: [{ type: "saller" }],
      validation: (Rule) => Rule.required(),
    },
    defineField({
      name: "details",
      title: "التفاصيل",
      type: "object",
      fields: [
        { name: "ar", title: "عربي", type: "markdown" },
        { name: "en", title: "إنجليزي", type: "markdown" },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "operation",
      title: "نوع العملية",
      type: "string",
      options: {
        list: [
          { title: "بيع", value: "sale" },
          { title: "إيجار", value: "rent" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "propertyType",
      title: "نوع العقار",
      type: "string",
      options: {
        list: [
          { title: "شقة", value: "apartment" },
          { title: "فيلا", value: "villa" },
          { title: "دوبلكس", value: "duplex" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "googleMap",
      type: "object",
      title: "googleMap",
      fields: [
        {
          name: "latitude",
          type: "number",
          validation: (Rule) => Rule.required().min(-90).max(90),
        },
        {
          name: "longitude",
          type: "number",
          validation: (Rule) => Rule.required().min(-180).max(180),
        },
      ],
    }),
  ],
});
