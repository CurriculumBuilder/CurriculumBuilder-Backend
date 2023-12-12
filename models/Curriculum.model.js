const { Schema, model } = require("mongoose");

const curriculumSchema = new Schema({
    userId: {type: Schema.ObjectId, ref: "User"},
    personalData: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      position: { type: String, required: true },
      summary: { type: String, required: true, maxlength: 400 },
    },
  
    links: [{
      label: { type: String },
      url: { type: String },
    }],
  
    skills: {
      type: [String],
      required: true,
    },
  
    languages: {
      type: [String],
      required: true,
      default: 'English'
    },
  
    projects: { type: String },
  
    experience: { type: String },
  
    education: { type: String },
  
    awards: { type: [String] }
  });
  

const Curriculum = model("Curriculum", curriculumSchema);

module.exports = Curriculum;