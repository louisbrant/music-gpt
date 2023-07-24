import { Message } from '@/types/answer';

export interface HomeInitialState {
    messages: Message[];
    isGettingRelatedData: boolean;
    relatedData: string[];
}

export const initialState: HomeInitialState = {
    messages: [],
    isGettingRelatedData: false,
    relatedData: []
};
