import { useState } from "react";

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/checkin')
    const data = await res.json()
    return { props: { data } }
}

interface Employee {
    checkedIn: boolean;
    name: string
}

export default function Home(props: any) {

    const [users, setUsers] =  useState(props.data)

    return (
        <>
            <ul>
                {users.map((e: Employee, index: number) => (
                    <li
                        key={index}
                    >
                        {e.checkedIn ? 'test' : 'test2'}
                    </li>
                ))}
            </ul>
        </>
    );
}
