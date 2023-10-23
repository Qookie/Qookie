package com.a504.qookie.domain.quest.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QQuest is a Querydsl query type for Quest
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QQuest extends EntityPathBase<Quest> {

    private static final long serialVersionUID = -1105521506L;

    public static final QQuest quest = new QQuest("quest");

    public final StringPath content = createString("content");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath media = createString("media");

    public final StringPath name = createString("name");

    public QQuest(String variable) {
        super(Quest.class, forVariable(variable));
    }

    public QQuest(Path<? extends Quest> path) {
        super(path.getType(), path.getMetadata());
    }

    public QQuest(PathMetadata metadata) {
        super(Quest.class, metadata);
    }

}

