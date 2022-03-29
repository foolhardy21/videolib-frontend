import { createContext, useContext, useState } from "react";

const PlaylistModalContext = createContext()

export const PlaylistModalProvider = ({ children }) => {
    const [isPlaylistModalVisible, setIsPlaylistModalVisible] = useState(false)

    function hidePlaylistModal() {
        setIsPlaylistModalVisible(false)
    }

    function showPlaylistModal() {
        setIsPlaylistModalVisible(true)
    }

    return (
        <PlaylistModalContext.Provider
            value={{
                isPlaylistModalVisible,
                showPlaylistModal,
                hidePlaylistModal,
            }}
        >
            {children}
        </PlaylistModalContext.Provider>
    )
}

export const usePlayListModal = () => useContext(PlaylistModalContext)
