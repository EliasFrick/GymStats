import {ExerciseState, ExercisePullState, ExerciseLegState} from "./Interface";

export const initialState: ExerciseState = {
    benchPressActive: false,
    chestActive: false,
    inclineBarbellActive: false,
    inclineDumbbellActive: false,
    flysObenActive: false,
    flysUntenActive: false,
    dipsActive: false,
    militaryPressActive: false,
    shoulderPressActive: false,
    sideRaiseActive: false,
    tricepsPushActive: false,
    katanaExtensionsActive: false,
    TricepsOverHeadActive: false,
    Platzhalter: false
};

export const chestExercises = [
    'benchPressActive',
    'chestActive',
    'inclineBarbellActive',
    'inclineDumbbellActive',
    'flysObenActive',
    'flysUntenActive',
    'dipsActive',
    'militaryPressActive',
    'shoulderPressActive',
    'sideRaiseActive',
    'tricepsPushActive',
    'katanaExtensionsActive',
    'TricepsOverHeadActive'
];



export const initialPullExercisesState: ExercisePullState = {
    pullDownActive: false,
    pullUpActive: false,
    tbarActive: false,
    tightRowingActive: false,
    barbellRowflysObenActive: false,
    DeadliftActive: false,
    highRowActive: false,
    facePullsActive: false,
    reverseFlysActive: false,
    pullOverActive: false,
    szCurlsActive: false,
    preacherCurlsActive: false,
    faceAwayCurlsActive: false,
    spiderCurlsActive: false,
    hammerCurlsActive: false,
    underamCurlsInsideActive: false,
    underamCurlsOutsideActive: false,
    Platzhalter: false
};

export const pullExercises = [
    'pullDownActive',
    'pullUpActive',
    'tbarActive',
    'tightRowingActive',
    'barbellRowflysObenActive',
    'DeadliftActive',
    'highRowActive',
    'facePullsActive',
    'reverseFlysActive',
    'pullOverActive',
    'szCurlsActive',
    'preacherCurlsActive',
    'faceAwayCurlsActive',
    'spiderCurlsActive',
    'hammerCurlsActive',
    'underamCurlsInsideActive',
    'underamCurlsOutsideActive',
];






export const initialLegState: ExerciseLegState = {
    squatsActive: false,
    hackSquatActive: false,
    thighCurlActive: false,
    romanianDeadliftActive: false,
    DeadliftActive: false,
    legPressActive: false,
    calfRaiseUnderLegPress: false,
    adductorActive: false,
    legExtensionsActive: false,
    abdominalMachineActive: false,
    Platzhalter: false
};

export const legExercises = [
    'squatsActive',
    'hackSquatActive',
    'thighCurlActive',
    'romanianDeadliftActive',
    'DeadliftActive',
    'legPressActive',
    'calfRaiseUnderLegPress',
    'adductorActive',
    'legExtensionsActive',
    'abdominalMachineActive',
];
