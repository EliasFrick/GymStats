import ToastMessage from "../Functions/ToastMessage";
import {useState} from "react";
import {ITrainWeightSaver} from "../Types/Interface";
import firebase from "firebase/compat";

export class TrainWeightSaver {
    private data: string;
    private todoRefForUser: any
    private currentExercise: any

    constructor(data: any, todoRefForUser: any, currentExercise: any) {
        this.data = data;
        this.todoRefForUser = todoRefForUser;
        this.currentExercise = currentExercise;
    }

    async saveDataToFirebase(): Promise<ITrainWeightSaver> {
            try {
                //console.log(this.currentExercise)
                await this.todoRefForUser.doc(this.currentExercise).collection(this.currentExercise).add(this.data);

                ToastMessage("Erfolgreich gespeichert");
                this.data = this.clearExerciseData(this.data)

                try {
                    ToastMessage("Erfolgreich gespeichert");
                    return {
                        successfulSaved: true,
                        showModal: false,
                    }
                }catch (error) {
                    return {
                        successfulSaved: false,
                        showModal: false,
                    }
                }
            } catch (e) {
                console.log(e);
                ToastMessage("Fehler beim speichern");
                return {
                    successfulSaved: false,
                    showModal: false,
                }
            }
    }

    clearExerciseData(data: any) {
        data ={
            exercise: "",
            time: "",
            data: [
                {kg: "", wdh: ""},
                {kg: "", wdh: ""},
                {kg: "", wdh: ""},
                {kg: "", wdh: ""},
            ],
            timestampField: firebase.firestore.FieldValue.serverTimestamp(),
        }
        return data
    }
}

