import { AssignmentModel, } from "../model/assignment.model.js";
import { CreateAssignmentDTO, } from "../dto/create-assignment.dto.js";


export class AssignmentRepository {
        constructor(
                private readonly model: typeof AssignmentModel
        ) { }

        async create(
                payload: CreateAssignmentDTO
        ) {
                return this.model.create({
                        ...payload,
                        generationStatus: payload.generationStatus ?? "PENDING",
                });
        }
        
        async findById(id: string) {
                return this.model.findById(id);
        }

        async findAll() {
                return this.model.find();
        }

        async updateStatus(
                id: string,
                status:
                        | "PENDING"
                        | "PROCESSING"
                        | "COMPLETED"
                        | "FAILED",

                errorMessage?: string
        ) {
                return this.model.findByIdAndUpdate(
                        id,
                        {
                                status,
                                errorMessage,
                        },
                        {
                                new: true,
                        }
                );
        }
        async delete(id: string) {
                return this.model.findByIdAndDelete(
                        id
                );
        }
        async update(
                id: string,
                payload: any
        ) {
                return this.model.findByIdAndUpdate(
                        id,
                        
                        payload,
                        {
                                new: true,
                        }
                );
        }

        async updateGenerationStatus(
                id: string,
                status:
                        | "PENDING"
                        | "PROCESSING"
                        | "COMPLETED"
                        | "FAILED",
                errorMessage?: string
        ) {
                return this.model.findByIdAndUpdate(
                        id,
                        {
                                generationStatus: status,
                                errorMessage,
                        },
                        {
                                new: true,
                        }
                );
        }


}