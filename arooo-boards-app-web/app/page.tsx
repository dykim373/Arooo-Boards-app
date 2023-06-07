"use client"
import { useState } from "react"
import ListContents from "./list-contents"

export default function Home() {
    const defaultLimit: number = 10;

    return (
        <div>
            <p className="bg-red-100">Contents</p>
            <ListContents
                showForm = {true}
                limit = {defaultLimit}
            />
        </div>
    )
}
