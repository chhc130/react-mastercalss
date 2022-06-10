import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Ul = styled.ul`
`
const Li = styled.li`
    background-color: white;
    color: ${(props) => props.theme.textColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover{
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`

const Price = () => {
    const location = useLocation();
    const state = location.state as {};
    return  (
        <>
            <Ul>
                {
                    Object.entries(state).map((kv, idx) => {
                        return <Li key={idx}>{`${kv[0]} : ${kv[1]}`}</Li>
                    })
                }
            </Ul>
        </>
    )
}

export default Price