import './App.css';
import PokemonList from './features/PokemonList'; 
import Layout from './components/Layout';
import Pokemon from './features/Pokemon';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<PostsList />} /> */}

        {/* <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route> */}

        <Route path="pokemon">
          <Route index element={<PokemonList/>} />
          <Route path=":id" element={<Pokemon />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Route>
    </Routes>
  );
}

export default App;
