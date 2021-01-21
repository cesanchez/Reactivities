import React, {FormEvent, useState} from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid';

interface IProps{
    setEditMode: (editMode: boolean) => void;
    activity: IActivity;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void
}

const ActivityForm: React.FC<IProps> = ({setEditMode, activity: initialFormstate, createActivity, editActivity}) => {

    const initializeForm = () => {
        if(initialFormstate){
            return initialFormstate
        }else{
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    };

    const [activity, setActivity] = useState<IActivity>(initializeForm)

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value}= event.currentTarget;
        setActivity({...activity, [name]: value})
    }

    const handleSubmit = () => {
        if(activity.id.length === 0){
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity)
        }else{
            editActivity(activity)
        }
    }

    return (
        <Segment clearing>
            <Form onSubmit = {handleSubmit}>
                <Form.Input onChange = {handleInputChange} name = 'title' placeholder = 'Title' value = {activity.title}/>
                <Form.TextArea onChange = {handleInputChange}  rows = {2} name = 'description' placeholder = 'Description' value = {activity.description}/>
                <Form.Input onChange = {handleInputChange}  placeholder = 'Category' name = 'category' value = {activity.category}/>
                <Form.Input onChange = {handleInputChange}  type = 'datetime-local' name = 'date' placeholder = 'Date' value = {activity.date}/>
                <Form.Input onChange = {handleInputChange}  placeholder = 'City' name = 'city' value = {activity.city}/>
                <Form.Input onChange = {handleInputChange}  placeholder = 'Venue' name = 'venue' value = {activity.venue}/>
                <Button floated = 'right' positive type = 'submit' content = 'Submit'/>
                <Button onClick = {() => setEditMode(false)} floated = 'right'  type = 'button' content = 'Cancel'/>
            </Form>
        </Segment>
    )
}

export default ActivityForm