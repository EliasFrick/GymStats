export default interface CustomDrawerProps {
    state: any;
    navigation: any;
    descriptors: any;
}

export default interface ISelectedDiet {
    // selectedDiet: ISelectedDiet | null;
    // setDiet: (diet: ISelectedDiet) => void;
}

export interface ExerciseState {
    benchPressActive: boolean;
    chestActive: boolean;
    inclineBarbellActive: boolean;
    inclineDumbbellActive: boolean;
    flysObenActive: boolean;
    flysUntenActive: boolean;
    dipsActive: boolean;
    militaryPressActive: boolean;
    shoulderPressActive: boolean;
    sideRaiseActive: boolean;
    tricepsPushActive: boolean;
    katanaExtensionsActive: boolean;
    TricepsOverHeadActive: boolean;
    Platzhalter: boolean
}

export interface ExercisePullState {
    pullDownActive: boolean;
    pullUpActive: boolean;
    tbarActive: boolean;
    tightRowingActive: boolean;
    barbellRowflysObenActive: boolean;
    DeadliftActive: boolean;
    highRowActive: boolean;
    facePullsActive: boolean;
    reverseFlysActive: boolean;
    pullOverActive: boolean;
    szCurlsActive: boolean;
    preacherCurlsActive: boolean;
    faceAwayCurlsActive: boolean;
    spiderCurlsActive: boolean;
    hammerCurlsActive: boolean;
    underamCurlsInsideActive: boolean;
    underamCurlsOutsideActive: boolean;
    Platzhalter: boolean
}

export interface ExerciseLegState {
    squatsActive: boolean;
    hackSquatActive: boolean;
    thighCurlActive: boolean;
    romanianDeadliftActive: boolean;
    DeadliftActive: boolean;
    legPressActive: boolean;
    calfRaiseUnderLegPress: boolean;
    adductorActive: boolean;
    legExtensionsActive: boolean;
    abdominalMachineActive: boolean;
    Platzhalter: boolean
}

export interface ITrainWeightSaver {
    showModal: boolean,
    successfulSaved: boolean
}
