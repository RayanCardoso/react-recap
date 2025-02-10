import { useState } from "react";
import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod';
import { 
    CountDownContainer, 
    FormContainer, 
    HomeContainer, 
    MinutesAmountInput, 
    Separator, 
    StartCountdownButton, 
    TaskInput 
} from "./styles";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa!"),
    minutesAmount: zod.number()
        .min(5, "O ciclo deve ter no minimo 5 minutos!")
        .max(60, "o ciclo deve ter no máximo 60 minutos!"),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export function Home() {
    const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    function handleCreateNewCycle(data: newCycleFormData) {
        reset();
    }

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        id="task" 
                        list="task-suggestions"
                        placeholder="Dê um nome para o seu projeto" 
                        {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput 
                        placeholder="00" 
                        id="minutesAmount" 
                        type="number"
                        step={5} 
                        min={5}
                        max={60}
                        {...register('minutesAmount', { valueAsNumber: true })}
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    
                    <Separator>:</Separator>

                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}