import { CenterObj } from "./CenterInterface";

export interface ScenarioObj{
    scenario_id: number;
    user_id: number;
    centers: CenterObj[];
}

export interface ScenarioStack{
    scenarios: ScenarioObj[];
}