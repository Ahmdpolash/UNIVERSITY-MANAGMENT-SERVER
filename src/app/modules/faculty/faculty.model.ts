import { model, Schema } from "mongoose";
import { FacultyModel, TFaculty, TUserName } from "./faculty.interface";
import { BloodGroup, Gender } from "./faculty.constant";
import AppError from "../../errors/AppError";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last Name is required"],
    maxlength: [20, "Name can not be more than 20 characters"],
  },
});

const facultySchema = new Schema<TFaculty, FacultyModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "Users",
    },

    designation: {
      type: String,
      required: [true, "designation is required"],
    },

    name: {
      type: userNameSchema,
      required: [true, "Name is required"],
    },

    gender: {
      type: String,
      enum: {
        values: Gender,
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    contactNo: { type: String, required: [true, "Contact number is required"] },

    emergencyContactNo: {
      type: String,
      required: [true, "Emergency contact number is required"],
    },
    bloodgGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: "{VALUE} is not a valid blood group",
      },
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
    profileImg: { type: String },
    // academicFaculty: {
    //   type: Schema.Types.ObjectId,
    //   required: [true, "faculty id is required"],
    //   ref: "AcademicFaculty",
    // },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, "academic department id is required"],
      ref: "AcademicDepartment",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
  }
);

facultySchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();

  const isExistFaculty = await Faculty.findOne(query);

  if (!isExistFaculty) {
    throw new AppError(404, "This faculty doesn't exist");
  }

  next();
});

//checking if faculty is already exist!
facultySchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Faculty.findOne({ id });
  return existingUser;
};

export const Faculty = model<TFaculty, FacultyModel>("Faculty", facultySchema);