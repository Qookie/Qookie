package com.a504.qookie.domain.cookie.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCookie is a Querydsl query type for Cookie
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCookie extends EntityPathBase<Cookie> {

    private static final long serialVersionUID = -1263235520L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCookie cookie = new QCookie("cookie");

    public final NumberPath<Integer> active = createNumber("active", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Integer> exp = createNumber("exp", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> level = createNumber("level", Integer.class);

    public final com.a504.qookie.domain.member.entity.QMember member;

    public final StringPath name = createString("name");

    public final NumberPath<Long> style = createNumber("style", Long.class);

    public QCookie(String variable) {
        this(Cookie.class, forVariable(variable), INITS);
    }

    public QCookie(Path<? extends Cookie> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCookie(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCookie(PathMetadata metadata, PathInits inits) {
        this(Cookie.class, metadata, inits);
    }

    public QCookie(Class<? extends Cookie> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.a504.qookie.domain.member.entity.QMember(forProperty("member")) : null;
    }

}

