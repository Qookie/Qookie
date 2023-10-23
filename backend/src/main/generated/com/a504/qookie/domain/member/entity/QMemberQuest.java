package com.a504.qookie.domain.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberQuest is a Querydsl query type for MemberQuest
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberQuest extends EntityPathBase<MemberQuest> {

    private static final long serialVersionUID = 714763286L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberQuest memberQuest = new QMemberQuest("memberQuest");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final QMember member;

    public final com.a504.qookie.domain.quest.entity.QQuest quest;

    public QMemberQuest(String variable) {
        this(MemberQuest.class, forVariable(variable), INITS);
    }

    public QMemberQuest(Path<? extends MemberQuest> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberQuest(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberQuest(PathMetadata metadata, PathInits inits) {
        this(MemberQuest.class, metadata, inits);
    }

    public QMemberQuest(Class<? extends MemberQuest> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
        this.quest = inits.isInitialized("quest") ? new com.a504.qookie.domain.quest.entity.QQuest(forProperty("quest")) : null;
    }

}

