import {SignInCard, LogInCard, NewInterviewCard, ResultPageCard} from "./Cards";

const ScreensState = {
    notLogin : [LogInCard,SignInCard],
    therapistLogin : [ResultPageCard, NewInterviewCard],
    patientLogin : [ResultPageCard, NewInterviewCard]
}

export default ScreensState;
