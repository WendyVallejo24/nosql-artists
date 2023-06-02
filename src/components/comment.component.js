import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { Form, ListGroup } from 'react-bootstrap';
import '../App.css';
import kafkaService from '../services/kafka.service';
import { useAuth } from '../context/AuthContext';
import MongoDBService from '../services/MongoDb.service';

const CommentComponent = ({ pubId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const mongoDBService = new MongoDBService('http://localhost:3001');

    const fetchData = async () => {
      try {
        const response = await mongoDBService.getCommentsByObjectId(pubId);
        setComments(response); // Actualiza el estado 'comments' con los comentarios recibidos
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [pubId]);

  function saveComment(comm) {
    const uId = user.uid;
    const oId = pubId;
    const comment = comm.content;
    //console.log("user id", uId, "object id", oId, "comentario", comment);
    kafkaService.comment(uId, oId, comment);
  }

  const handleAddComment = () => {
    if (newComment.trim() === '') {
      return; // Evitar agregar comentarios vacíos
    }

    const comment = { id: Date.now(), content: newComment };
    saveComment(comment);
    setComments((prevComments) => [...prevComments, comment]);
    setNewComment('');
  };

  return (
    <View>
      <div className="newComment">
        <div className="comment-list">
          <FlatList
            data={comments}
            renderItem={({ item }) => <Text>{item.content}</Text>}
            keyExtractor={(item) => item.id.toString()}
          />
          <Form className="comment-form">
            <Form.Control
              type="text"
              placeholder="Nuevo comentario"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />

            <Button className="btnAgregar" title="Agregar" onPress={handleAddComment}>Agregar</Button>
          </Form>

        </div>

      </div>
    </View>
  );
};

export default CommentComponent;