// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ExamSchema = new mongoose.Schema({
  // Company Details
  companyName: String,
  companyDescription: String,
  linkedinProfile: String,
  instagram: String,

  // Exam Details
  examTitle: String,
  examDescription: String,
  examCategory: String,
  examCode: String,
  examDuration: String,
  totalMarks: String,
  passingCriteria: String,
  examMode: String,
  attemptsAllowed: String,
  examFee: String,

  // Certification Details
  certificationTitle: String,
  certificationLevel: String,
  validityPeriod: String,
  certificationId: String,
  certificationAuthority: String,
  issueDate: String,
  expiryDate: String,
  renewalCriteria: String,

  // Exam Content
  questionTypes: String,
  numberOfQuestions: String,
  sectionBreakdown: String,
  syllabus: String,
  referenceMaterials: String,

  // Exam Scheduling
  examDate: String,
  examTime: String,
  timeZone: String,
  rescheduleOption: String,
  reschedulePolicy: String,

  // Candidate Preparation
  studyGuides: String,
  practiceTests: String,
  previousYearPapers: String,
  tutorialVideos: String,
  faqsAndTips: String,

  // Exam Administration
  idVerificationRequired: String,
  examRules: String,
  allowedMaterials: String,

  // Results & Feedback
  resultDate: String,
  reevaluationOption: String,

  // Payment & Billing
  paymentMethods: String,
  refundPolicy: String,
});

const Exam = mongoose.model("admin_exam", ExamSchema);

app.post("/api/exam", async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res
      .status(201)
      .json({ message: "Exam details saved successfully", examId: exam._id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving exam details", error: error.message });
  }
});

app.get("/api/company-names", async (req, res) => {
  const companyNames = await Exam.find();
  const companyArr = [];
  for (let i = 0; i < companyNames.length; i++) {
    companyArr.push(companyNames[i].companyName);
  }
  return res.json(companyArr);
});

app.get("/api/exam/:id", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json(exam);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving exam details", error: error.message });
  }
});

app.put("/api/exam/:id", async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json({ message: "Exam details updated successfully", exam });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating exam details", error: error.message });
  }
});

app.delete("/api/exam/:id", async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json({ message: "Exam deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting exam", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
