import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"
const SvgComponent = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M25 11.875V9c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.093C23.1 5 22.4 5 21 5H6.5c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093C2.5 6.9 2.5 7.6 2.5 9v12c0 1.4 0 2.1.272 2.635a2.5 2.5 0 0 0 1.093 1.092C4.4 25 5.1 25 6.5 25H21c1.4 0 2.1 0 2.635-.273a2.5 2.5 0 0 0 1.092-1.092C25 23.1 25 22.4 25 21v-2.875M18.75 15c0-.58 0-.871.048-1.113a2.5 2.5 0 0 1 1.964-1.964c.242-.048.532-.048 1.113-.048h2.5c.58 0 .871 0 1.113.048a2.5 2.5 0 0 1 1.964 1.964c.048.242.048.532.048 1.113 0 .58 0 .871-.048 1.113a2.5 2.5 0 0 1-1.964 1.964c-.242.048-.532.048-1.113.048h-2.5c-.58 0-.871 0-1.113-.048a2.5 2.5 0 0 1-1.964-1.964c-.048-.242-.048-.532-.048-1.113Z"
        />
        <Path
        fill="#000"
        d="m10.3 38.23-5.59-5.67.28.07.02 5.37h-.97v-7.45h.05l5.53 5.69-.23-.05-.02-5.42h.96v7.46h-.03Zm3.63-.13c-.474 0-.88-.093-1.22-.28a2.065 2.065 0 0 1-.79-.78 2.36 2.36 0 0 1-.27-1.14c0-.407.102-.777.31-1.11.206-.333.482-.6.83-.8.346-.2.733-.3 1.16-.3.546 0 1 .16 1.36.48.36.32.602.76.73 1.32l-3.41 1.2-.22-.55 2.8-1.02-.2.13a1.35 1.35 0 0 0-.4-.57c-.188-.167-.43-.25-.73-.25-.254 0-.48.063-.68.19-.2.12-.357.287-.47.5-.114.213-.17.457-.17.73 0 .287.06.54.18.76.12.213.283.383.49.51.213.12.452.18.72.18.18 0 .353-.033.52-.1.172-.067.332-.153.48-.26l.43.69c-.208.14-.44.253-.7.34-.254.087-.504.13-.75.13Zm5.637-4.24 1.22 2.79-.18.02 1.14-2.81h.91l-1.9 4.39-1.33-2.84-1.21 2.84-1.92-4.39h.91l1.29 2.92-.32-.06.92-2.14-.33-.72h.8Z"
        />
    </Svg>
)
const Memo = memo(SvgComponent)
export default Memo